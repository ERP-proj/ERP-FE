// ✅ src/hooks/member/useRegisterMember.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memberAPI } from "@/api/member";
import { transformFormDataToMember } from "@/utils/member/transformFormDataToMember";
import type { FormData as MemberFormData } from "@/types/memberType";

export const useRegisterMember = () => {
  const queryClient = useQueryClient(); // ✅ 훅은 함수 내부에서 호출

  return useMutation({
    mutationFn: (newMember: MemberFormData) =>
      memberAPI.registMember(newMember),

    onMutate: async (newMember: MemberFormData) => {
      await queryClient.cancelQueries({ queryKey: ["members", "ACTIVE"] });

      const previousData = queryClient.getQueryData(["members", "ACTIVE"]);

      const previewUrl = newMember.photoFile
        ? URL.createObjectURL(newMember.photoFile)
        : "https://via.placeholder.com/150";

      const optimisticMember = transformFormDataToMember(newMember, previewUrl);

      queryClient.setQueryData(["members", "ACTIVE"], (old: any) => {
        return {
          ...old,
          pages: [
            [optimisticMember, ...(old?.pages?.[0] || [])],
            ...(old?.pages?.slice(1) || []),
          ],
          pageParams: old?.pageParams || [],
        };
      });

      return { previousData };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members", "ACTIVE"] });
    },

    onError: (_err, _newMember, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["members", "ACTIVE"], context.previousData);
      }
    },
  });
};
