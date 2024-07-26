"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
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
  phone: z.string().min(10).max(10).optional().or(z.literal('')),
  fatherName:z.string().min(3, {
    message: "fatherName must be at least 3 characters.",
  }).optional().or(z.literal('')),
  neighbour:z.string().min(3, {
    message: "neighbour must be at least 3 characters.",
  }).optional().or(z.literal('')),
  rating:z.string().min(1, {
    message: "rating must be at least 1 characters.",
  }).optional().or(z.literal('')),
  extra:z.string().min(3, {
    message: "extra must be at least 3 characters.",
  }).optional().or(z.literal('')),
})

export default function ProfileForm() {
    const defaultValues = { 
        name: "",
        cast:"",
        address:"",
        village:"",
        Phone:"",
        fatherName:"",
        neighbour:"",
        rating:"",
        extra:""
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Cast</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Village</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Father Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="shadcn" {...field} />
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
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg">Submit</Button>
      </form>
    </Form>
  )
}
