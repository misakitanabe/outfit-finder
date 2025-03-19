import { useActionState } from "react";

interface OnSubmitResponse {
    type: "error" | "success";
    message: string;
}

type OnSubmitFunction = (username: string, password: string) => Promise<OnSubmitResponse>;

interface UsernamePasswordFormProps {
    onSubmit: OnSubmitFunction;
}

export function UsernamePasswordForm(props : UsernamePasswordFormProps) {
    const [result, submitAction, isPending] = useActionState(
        async (previousState: any, formData: FormData) => {
            const username = formData.get("username") as string | null;
            const password = formData.get("password") as string | null;

            if (!username || !password) {
                return {
                    type: "error",
                    message: `Please fill in your username and password.`,
                };
            }

            const submitResult = await props.onSubmit(username, password);
            // console.log(`submitResult: ${submitResult}`);

            return submitResult;
        },
        null
    );

    return (
        <>
            {result && (
                <p style={{ color: result.type === "error" ? 'red' : 'black' }}>
                    {result.message}
                </p>
            )}
            <form action={submitAction}>
                <label>
                    <span>Username</span>
                    <input id="username" name="username" disabled={isPending} />
                </label>

                <label>
                    <span>Password</span>
                    <input type="password" id="password" name="password" disabled={isPending} />
                </label>
                
                <button disabled={isPending}>submit</button>
            </form>
        </>
        
    );
}