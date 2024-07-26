
import { signIn } from "@/auth"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google",{redirectTo:"/admin/sellManager"});
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
}