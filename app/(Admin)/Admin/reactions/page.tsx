import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import ReactionCard from "./_Reactions-Components/reaction_card";
import { CreateReactionForm } from "./_Reactions-Components/create_reaction_form";

export type ReactionCardsProp = Prisma.ReactionGetPayload<{}>;

const ReactionsPage = async () => {

    const reactions = await prisma.reaction.findMany()

  return (
    <div className="w-full h-full">
      <div className="w-full h-full space-y-30">
        <div className="w-full flex items-center justify-evenly">
          {reactions.map((reaction) => {
            return <ReactionCard key={reaction.id} {...reaction} />;
          })}
        </div>

        <div className="w-full">
          <CreateReactionForm className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default ReactionsPage;
