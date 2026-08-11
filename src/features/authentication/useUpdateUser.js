import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: ({ password, fullName, avatar }) =>
            updateCurrentUser(password, fullName, avatar),
        onSuccess: ({user}) => {
            console.log(user)
            toast.success("User account successfully updated");
            queryClient.setQueryData(["user"], user);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { updateUser, isPending };
}
