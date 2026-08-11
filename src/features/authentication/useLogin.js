import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isPending, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginApi(email, password),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user.user);
            toast.success("successfully login");
            navigate("/dashboard", { replace: true });
        },
        onError: (error) => {
            console.log("ERROR", error);
            toast.error("Provider email or password are incorrect");
        },
    });

    return { isPending, login };
}
