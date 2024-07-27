"use client";

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  userId: z.number().min(1, "User ID is required."),
  itemId: z.number().optional(),
  totalItem: z.number().min(0, "Total items must be 0 or more."),
  returnCount: z.number().min(0, "Return count must be 0 or more."),
  value: z.number().min(0, "Value must be 0 or more."),
  cash: z.number().min(0, "Cash must be 0 or more."),
  pickedBy: z.string().optional(),
});

type EntryFormProps = {
  defaultValues?: Partial<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export function EntryForm({ defaultValues, onSubmit }: EntryFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter user ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item ID</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter item ID" {...field} />
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
              <FormLabel>Total Item</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter total items" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="returnCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Return Count</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter return count" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
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
              <FormLabel>Cash</FormLabel>
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
              <FormLabel>Picked By</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter picked by" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg">Submit</Button>
      </form>
    </Form>
  );
}
