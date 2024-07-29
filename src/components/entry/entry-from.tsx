"use client";

import { useEffect,useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getEntryDetails } from "@/lib/queries";
import {
  User,
  Item,
  Entry
} from '@prisma/client'
import MyLoader from "@/components/ui/loader";
import { updateEntry, createEntry} from "@/lib/queries"

const formSchema = z.object({
  userId: z.number().min(1, "User ID is required."),
  itemId: z.number().optional().or(z.literal(0)),
  totalItem: z.string().min(1, "Total items must be 0 or more."),
  returnCount: z.string().min(1, "Return count must be 0 or more."),
  value: z.string().min(1, "Value must be 0 or more."),
  cash: z.string().min(1, "Cash must be 0 or more."),
  pickedBy: z.string().optional(),
});

type EntryFormProps = {
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

type defaultValues = {
  userId:number|undefined,
  itemId:number|undefined,
  totalItem:number|undefined,
  returnCount:number|undefined,
  value:number|undefined,
  cash:number,
  pickedBy:string,
}

export function EntryForm(props:{userId:number, id?:number}) {
  const {userId,id} = props;

  const [items,setItems]= useState<Item[]>();
  const [user,setUser]= useState<User>();
  const [isSaving,setIsSaving]=useState<boolean>();

  const defaultValues = {
    userId:0,
    itemId:0,
    totalItem:'0',
    returnCount:'0',
    value:'0',
    cash:'0',
    pickedBy:"",
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(()=>{
    const fetchData=async()=>{
        try{
            console.log('id : ',typeof id);
            let response:any = null;
            form.setValue('userId',userId);
            if(id){
              response= await getEntryDetails(userId,id);
            }
            else{
              response= await getEntryDetails(userId);
            }

            if(response){
                setItems(response.items);
                setUser(response.user);
                form.setValue('itemId',response.items[0].id);

                if(response.entry){
                    const {
                        itemId,
                        totalItem,
                        returnCount,
                        value,
                        cash,
                        pickedBy,
                    } = response.entry;
                    form.reset({
                      userId: userId,
                      itemId: itemId || 0,
                      totalItem: totalItem || 0,
                      returnCount: returnCount || 0,
                      value: value || 0,
                      cash: cash || 0,
                      pickedBy: pickedBy || ''
                    });
                    // defaultValues.itemId= itemId ? itemId :0;
                    // defaultValues.totalItem= totalItem ? totalItem :0;
                    // defaultValues.returnCount= returnCount ? returnCount :0;
                    // defaultValues.value= value ? value :0;
                    // defaultValues.cash= cash ? cash :0;
                    // defaultValues.pickedBy= pickedBy ? pickedBy :'';
                    // form.reset(defaultValues);
                }

            }
        }
        catch(e){
            console.log(e)
        }
    }
    if(userId){
      fetchData();
    }
},[userId,id]);

useEffect(()=>{
    console.log("items : ", items);
    console.log("user : ", user);
},[items,user])


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    console.log("values : ",values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const finalData ={
        ...values,
        itemId:parseInt(values.itemId+""),
        totalItem:parseInt(values.totalItem+""),
        returnCount:parseInt(values.returnCount+""),
        value:parseInt(values.value+""),
        cash:parseInt(values.cash+""),
    }
    
    if(id){
        //@ts-ignore
        const resp = await updateEntry(id,finalData);
        console.log('resp', resp);
        if(resp) {
          toast.success("Entry updated successfully");
        }
        else {
          toast.error("Error in updating");
          setIsSaving(false);
        }
    }
    else{
        //@ts-ignore
        const resp = await createEntry(finalData);
        console.log('resp', resp);
        if(resp) {toast.success("Entry created successfully");}
        else {
          toast.error("Error in creating");
          setIsSaving(false);
        }
    }
  }
  const itemUpdateValue=(value:string)=>{
    console.log('calling ..................',value);
    form.setValue('itemId', parseInt(value));
    updateValue()
  }
  const countUpdateValue=(e:React.ChangeEvent<HTMLInputElement>)=>{
    form.setValue('totalItem', e.target.value);
    updateValue()
  }
  const updateValue =()=>{
    
    const totalItem = parseInt(form.getValues('totalItem'));
    const returnCount = parseInt(form.getValues('returnCount') || '0');
    let itemId = form.getValues('itemId');
     if(items && !itemId){
       itemId = items[0].id;
      // form.setValue('itemId', itemId);
    }
    console.log('totalItem', totalItem, 'returnCount', returnCount, 'itemId', itemId);
    if(totalItem && returnCount>=0 && itemId){
        const remainingItem = totalItem - returnCount;
        const item = items?.find((item)=>item.id == itemId);
        if(item){
            const value = remainingItem * item.price;
            console.log('value',value);
            form.setValue('value', value+"");
        }
    }
    return
  }

  return (
    <div className="flex flex-col items-center py-4">
        { items && items.length>0 && user && user.name ?
        <>
          <h1 className="py-4"> {user.name} </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="itemId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup defaultValue={items[0].id ? items[0].id+'': undefined} onValueChange={(e)=>{itemUpdateValue(e)}}>
                        {items.map((item)=>{
                          return (
                          <div key={item.id} className="flex items-center space-x-2">
                            <RadioGroupItem value={item.id+""} id={item.id+""} />
                            <Label htmlFor={item.name}>{item.name}</Label>
                          </div>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalItem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>नग</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter total items" {...field} onChange={(e)=>{countUpdateValue(e)}}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {id ?
              <FormField
                control={form.control}
                name="returnCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>वापस </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter return count" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               : null}
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>रूपए</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>जमा</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter cash" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pickedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>कौन</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="कौन" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className='my-4'  size="lg">{isSaving ? <MyLoader size='sm'/> : "सेव करे" }</Button>
            </form>
          </Form>
        </>
        : <MyLoader /> }
    </div>

    
  );
}
