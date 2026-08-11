import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
    const { mutate: signup, isPending } = useMutation({
        mutationFn: ({ fullName, email, password }) =>
            signUpApi(fullName, email, password),
        onSuccess: () => {
            toast.success(
                "Account successfully created! Please verify the new account from user's email address.",
            );
        },
        onError: (err) => toast.error(err.message),
    });

    return { signup, isPending };
}
