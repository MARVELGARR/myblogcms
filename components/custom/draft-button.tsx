"use client";
import { createDraft } from "@/app/(Admin)/_AdminActions/_Admin_Drafy_Actions/create-draft";
import { usePostStore } from "@/zustand/post-store";
import { Prisma } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { updateDraft } from "@/app/(Admin)/_AdminActions/_Admin_Drafy_Actions/update-draft";
import useLocalStorage from "@/hooks/use-local-storage";

export type CreateDraftType = Omit<Prisma.DraftCreateInput, "author">;
const DraftButton = () => {
  const {
    tags,
    title,
    description,
    category,
    featured,
    markdown,
    uploadedFiles,
  } = usePostStore();
  const { data: session } = useSession();

  const draft = {
    title,
    description,
    content: markdown,
    image: uploadedFiles[0]?.url,
    featured,
    tags,
    categoryId: category,
  };

  const [draftStorage, setDraftStorage] = useLocalStorage<CreateDraftType>(
    "Post-Draft",
    {}
  );

  const create_draft_mutation = useMutation({
    mutationFn: () => createDraft(draft),
    onSuccess: (data) => {
      setDraftStorage(data);
    },
    onError: (error) => {},
  });

  const draftId = draftStorage.id;

  const update_draft_mutation = useMutation({
    mutationFn: () => updateDraft(draft, draftId),
  });

  return (
    <>
      {!draftId ? (
        <Button
          className="cursor-pointer"
          onClick={() => create_draft_mutation.mutate()}
          disabled={create_draft_mutation.isPending}
        >
          {create_draft_mutation.isPending ? "Drafting..." : "Draft"}
        </Button>
      ) : (
        <Button
          className="cursor-pointer"
          onClick={() => update_draft_mutation.mutate()}
          disabled={update_draft_mutation.isPending}
        >
          {update_draft_mutation.isPending ? "saving..." : "save"}
        </Button>
      )}
    </>
  );
};

export default DraftButton;
