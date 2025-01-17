"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { boolean, z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import {getUser,createUser,updateUser} from "@/lib/queries";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import MyLoader from "@/components/ui/loader"

const formSchema = z.object({
//   id: z.string().optional().or(z.literal('')),
  name: z.string().min(5, {
    message: "name must be at least 5 characters.",
  }),
  cast: z.string().min(3, {
    message: "cast must be at least 3 characters.",
  }),
  address:z.string().min(3, {
    message: "address must be at least 3 characters.",
  }),
  village:z.string().min(3, {
    message: "village must be at least 3 characters.",
  }).optional().or(z.literal('')),
  phone: z.string().min(10).max(10).optional().or(z.literal('0')),
  fatherName:z.string().min(3, {
    message: "fatherName must be at least 3 characters.",
  }).optional().or(z.literal('')),
  neighbour:z.string().min(3, {
    message: "neighbour must be at least 3 characters.",
  }).optional().or(z.literal('')),
  rating:z.string().min(0, {
    message: "rating must be at least 1 characters.",
  }).max(1).optional().or(z.literal('')),
  extra:z.string().min(3, {
    message: "extra must be at least 3 characters.",
  }).optional().or(z.literal('')),
})

export default function UserForm(props:{id?:number}) {

    const [isSaving,setIsSaving]=useState<boolean>(false);

    const router = useRouter();
    // const [isloading,setL]
    const {id} = props;
    const defaultValues = { 
        name: "",
        cast:"",
        address:"",
        village:"",
        phone:'',
        fatherName:"",
        neighbour:"",
        rating:'0',
        extra:""
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSaving(true);
        // console.log("values : ",values);
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const phone = values.phone && values.phone!='' ? parseInt(values.phone+"") : 0;
        const rating = values.rating && values.rating!='' ? parseInt(values.rating+"") : 0;

        if(id){
            //@ts-ignore
            const response = await updateUser(id,{...values,phone,rating});
            if(response && response.id){
                router.push(`/admin/entry?userid=${response.id}`);
            }
        }
        else{
            //@ts-ignore
            const response = await createUser({...values,phone,rating});
            if(response && response.id){
                router.push(`/admin/entry?userid=${response.id}`);
            }
        }
        setIsSaving(false);
      }

    useEffect(()=>{
        const fetchData=async()=>{
            if(id){
                try{
                    console.log('id : ',typeof id);
                    const response = await getUser(id);
                    // console.log("response : ",response);
                    if(response && response.name){
                        const {
                            name, 
                            cast,
                            address,
                            village,
                            phone,
                            fatherName,
                            neighbour,
                            rating,
                            extra,
                        } = response;
                        defaultValues.name= name ? name :'';
                        defaultValues.cast= cast ? cast :'';
                        defaultValues.address= address ? address :'';
                        defaultValues.village= village ? village :'';
                        defaultValues.phone= phone ? phone+'' : '0';
                        defaultValues.fatherName= fatherName ? fatherName :'';
                        defaultValues.neighbour= neighbour ? neighbour :'';
                        //@ts-ignore
                        defaultValues.rating= rating ? rating+'' :'';
                        defaultValues.extra= extra ? extra :'';
                        form.reset(defaultValues);
                    }
                }
                catch(e){
                    console.log(e)
                }
            }
        }

        fetchData();
    },[id]);




  return (
    <div className="flex flex-col items-center py-4">
        <h1 className="py-4"> {id ?  defaultValues.name + " ग्राहक" : "ग्राहक जोड़े"} </h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>नाम </FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                </FormDescription> */}
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="cast"
            render={({ field }) => (
                <FormItem>
                <FormLabel>जाति</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
                <FormItem>
                <FormLabel>पता</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="village"
            render={({ field }) => (
                <FormItem>
                <FormLabel>गाँव</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>फ़ोन</FormLabel>
                <FormControl>
                    <Input type="tel" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>बेटा</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="neighbour"
            render={({ field }) => (
                <FormItem>
                <FormLabel>पड़ोसी</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="extra"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Extra</FormLabel>
                <FormControl>
                    <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
                <FormItem>
                <FormLabel>रेटिंग</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" size="lg">{isSaving ? <MyLoader size='sm'/> : 'जोड़े'}</Button>
        </form>
        </Form>
    </div>
  )
}


