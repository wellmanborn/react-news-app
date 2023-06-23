import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
function LoginValidation() {


    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(32)
            // .regex(/^$/i,{message: "message"})
    })

    return zodResolver(schema);
}

export default LoginValidation;