"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, Mail, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import onSubscribe from "@/actions/Normal_Actions/subscription_actions"

const subscriptionSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})



type SubscriptionFormData = z.infer<typeof subscriptionSchema>

export function SubscriptionForm() {
  const [activeTab, setActiveTab] = useState<"subscribe" | "add-user">("subscribe")



  const subscriptionForm = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: "",
    },
  })


  const subscriptionMutattion = useMutation({
    mutationFn: (email: string)=>onSubscribe(email),
    onSuccess(data) {
      toast(`${data.message}`)
    },
    onError(error){
      toast(`${error.message}`)
    }
  })



  return (
    <div className="space-y-6">
     
        <Card className="border-0">
          <CardHeader>
            <CardTitle>Subscribe to Blog Notifications</CardTitle>
            <CardDescription>
              Subscribe  to receive notifications when new blog posts are published.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...subscriptionForm}>
              <form onSubmit={subscriptionForm.handleSubmit((value)=>subscriptionMutattion.mutate(value.email))} className="space-y-4">
                <FormField
                  control={subscriptionForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={subscriptionMutattion.isPending} className="w-full">
                  {subscriptionMutattion.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Subscribe User
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>



    </div>
  )
}
