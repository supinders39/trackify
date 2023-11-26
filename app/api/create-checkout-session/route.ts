import { getUrl } from "@/libs/helpers";
import { stripe } from "@/libs/stripe";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: NextResponse) {
    const { price, quantity = 1, metadata = {} } = await request.json();

    try {
        const supabase = createRouteHandlerClient({
            cookies
        })

        const { data: { user } } = await supabase.auth.getUser();

        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || "",
            email: user?.email || ""
        })

        const session = await stripe.checkout.sessions.create({
            // @ts-ignore
            payment_method_types: ["card"],
            billing_address_collection: 'required',
            customer, 
            line_items: [
                {
                    price: price.id,
                  quantity  
                }
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            subscription_data: {
                trial_from_plan: true,
                metadata
            },
            success_url: `${getUrl()}/account`,
            cancel_url: `${getUrl()}`,
        })
        return NextResponse.json({sessionId: session.id})
    } catch (error) {
        console.log(error);
        return new NextResponse("internal erorr", {status: 500})
    }
}
