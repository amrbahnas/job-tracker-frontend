"use client"
import { Button } from "@/components/ui/button"

import { Form, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
})

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  return (
    <div className="container flex h-fit flex-col gap-10 py-12 font-medium">
      <Form<z.infer<typeof formSchema>>
        onSubmit={(values) => {
          console.log(values)
        }}
        form={form}
        className="w-full max-w-md"
      >
        {/* FormItem automatic pass value,onchange to input */}
        <FormItem name="name">
          <Input label="Name" />
        </FormItem>
        <FormItem name="email">
          <Input label="Email" />
        </FormItem>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}
