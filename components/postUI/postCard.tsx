import { Post } from "@prisma/client";

type PostCardProp = Omit<Post, "categoryId">

const PostCard = ({}:PostCardProp) => {

    return (
        <div className=""></div>
    );
}
 
export default PostCard;