import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useEditSettings() {
    const queryClient = useQueryClient();
    const { isPending: isEditing, mutate: updateSetting } = useMutation({
        mutationFn: (newSetting) => updateSettingApi(newSetting),
        onSuccess: () => {
            toast.success("Settings successfully updated");
            queryClient.invalidateQueries({
                queryKey: ["settings"],
            });
        },
        onError: (error) => toast.error(error.message),
    });

    return { isEditing, updateSetting };
}
