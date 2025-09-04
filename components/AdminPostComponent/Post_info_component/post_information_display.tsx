'use client'
import useGetPostById from "@/app/(Admin)/_AdminHooks/_AdminPostHooks/useGetPostById";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Edit, Eye, EyeOff, Hash, Loader2, Tag, User } from "lucide-react";
import { useSearchParams } from "next/navigation";

const PostInformationDisplay = () => {
  const urlParam = useSearchParams();
  const postId = urlParam.get("postId");
  const { isLoadingPostDetails, isPostDetailsError, postDetailes } = useGetPostById(postId);

  if (!postId) {
    return <div className="shadow-2xl w-[20rem] drop-shadow-md h-full shadow-background"></div>;
  }


  if (isPostDetailsError) {
    return <div className="shadow-2xl w-[20rem] drop-shadow-md h-full shadow-background" ></div>;
  }

  if (isLoadingPostDetails) {
    return (
      <div className="shadow-2xl w-[20rem] drop-shadow-md h-full shadow-background">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!postDetailes) {
    return (
      <div className="w-80 border-l bg-muted/20 p-6 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="mb-2 text-4xl">📄</div>
          <p className="text-sm">Select a post to view details</p>
        </div>
      </div>
    );
  }



      return (
        <div className="shadow-2xl w-[20rem] drop-shadow-md h-full shadow-background">
                <div className="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
        <div>
          <h4 className="font-semibold text-lg mb-2 leading-tight">{postDetailes.title}</h4>
          <Badge variant={postDetailes.published  ? "default" : "secondary"}>
            {postDetailes.published ? (
              <Eye className="h-3 w-3 mr-1" />
            ) : (
              <EyeOff className="h-3 w-3 mr-1" />
            )}
            {postDetailes.published}
          </Badge>
        </div>

        {postDetailes.image && (
          <div className="aspect-video rounded-lg overflow-hidden">
            <img
              src={postDetailes.image || "/placeholder.svg"}
              alt={postDetailes.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-3 bg-muted/30 p-3 rounded-lg">
          <h5 className="font-medium text-sm">Post Information</h5>

          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">By {postDetailes.author.name}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>
                Created{" "}
                {new Date(postDetailes.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Tag className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{postDetailes.category?.name}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="h-4 w-4 flex-shrink-0" />
              <span>ID: {postDetailes.id}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>~{Math.ceil(postDetailes.content.split(" ").length / 200)} min read</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h5 className="font-medium">Content Preview</h5>
            <span className="text-xs text-muted-foreground">{postDetailes.content.split(" ").length} words</span>
          </div>
          <div className="bg-muted/20 p-3 rounded-lg max-h-32 overflow-y-auto">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {postDetailes.content.length > 200
                ? `${postDetailes.content.substring(0, 200)}...`
                : postDetailes.content}
            </p>
          </div>
        </div>

        <div className="pt-4 space-y-2 border-t">
          <h5 className="font-medium text-sm mb-3">Admin Actions</h5>

          <Button onClick={()=>{}} className="w-full" variant="default">
            <Edit className="h-4 w-4 mr-2" />
            Edit Post
          </Button>

          <Button
            onClick={()=>{}}
            className="w-full"
            variant={postDetailes.published ? "destructive" : "default"}
          >
            {postDetailes.published ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Unpublish Post
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Publish Post
              </>
            )}
          </Button>

          <Button className="w-full bg-transparent" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View Full Post
          </Button>
        </div>
      </div>
        </div>
      );
  

};

export default PostInformationDisplay;
