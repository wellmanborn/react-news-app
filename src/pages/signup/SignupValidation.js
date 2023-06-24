import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
function SignupValidation() {


    const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6).max(32),
        password_confirm: z.string().min(6).max(32),
            // .regex(/^$/i,{message: "message"})
    })

    return zodResolver(schema);
}

export default SignupValidation;