"use client"

import * as React from "react"
import { X, Edit, Eye, EyeOff, Calendar, User, Hash, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerTrigger } from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEditPostStore } from "@/zustand/edit-post-store"
import { EditorPostProp } from "@/app/(Admin)/_AdminComponents/edit-posrEditor"
import { EditCategorySelect } from "@/components/custom/editCategorySelector"
import { useDrawerStore } from "@/zustand/drawer-store"


export function PostDetailsDrawer({post}:EditorPostProp) {

  const {removeTag, setFeatured, featured, tags, setTags, addTag, description, setDescription, title, setTittle} = useEditPostStore()
   const [tagInput, setTagInput] = React.useState("")
  const [isEditing, setIsEditing] = React.useState(false)

  const { isOpen, type, onClose} = useDrawerStore()

  const isDrawerOpen =  isOpen && type == "Edit-post"


  const handleClose =() =>{
    onClose()
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

    const handleAddTag = () => {
    const trimmedTag = tagInput.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      addTag(trimmedTag)
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    removeTag(tagToRemove)
  }

    const handleTittleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTittle(e.target.value)
    }
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value)
    }
  
  
    const handleFeaturedToggle = (checked: boolean) => {
      setFeatured(checked)
    }

 

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleUnpublish = () => {
   
  }
  const handlePublish = () =>{

  }

  const handleSave =()=>{

  }




  const isPublished = !!post.published 
  const readingTime = Math.ceil(post.content.split(" ").length / 200)

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleClose} >

      <DrawerContent className=" ">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-semibold">{isEditing ? "Edit Post" : "Post Details"}</DrawerTitle>
            <div className="flex items-center gap-2">
              {!isEditing && (
                <>
                  <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2 bg-transparent">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant={isPublished ? "destructive" : "default"}
                    size="sm"
                    onClick={isPublished ? handleUnpublish : handlePublish}
                    className="gap-2"
                  >
                    {isPublished ? (
                      <>
                        <EyeOff className="h-4 w-4" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4" />
                        Publish
                      </>
                    )}
                  </Button>
                </>
              )}
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-hidden">
          {isEditing ? (
            <div className="p-6 h-full overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Edit Post Metadata</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Title Section */}
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium text-foreground">
                      Title
                    </label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Enter post title"
                      value={title}
                      onChange={handleTittleChange}
                      className="w-full"
                    />
                  </div>

                  {/* Description Section */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium text-foreground">
                      Description
                    </label>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Enter post description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className="w-full"
                    />
                  </div>

                  {/* Category Section */}
                    <EditCategorySelect/>

                  {/* Tags Section */}
                  <div className="space-y-2">
                    <label htmlFor="tags" className="text-sm font-medium text-foreground">
                      Tags
                    </label>
                    <div className="flex gap-2">
                      <Input
                        id="tags"
                        type="text"
                        placeholder="Add a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        disabled={!tagInput.trim() || tags.includes(tagInput.trim())}
                        size="sm"
                        className="shrink-0"
                      >
                        <Plus className="size-4" />
                        Add
                      </Button>
                    </div>

                    {/* Display Tags */}
                    {post.tag.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tag.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1 pr-1">
                            <span>{tag}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTag(tag)}
                              className="h-auto p-0.5 hover:bg-destructive hover:text-destructive-foreground rounded-sm"
                            >
                              <X className="size-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Featured Toggle Section */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label htmlFor="featured" className="text-sm font-medium text-foreground">
                        Featured Post
                      </label>
                      <p className="text-xs text-muted-foreground">Mark this post as featured to highlight it</p>
                    </div>
                    <Switch
                      id="featured"
                      checked={featured}
                      onCheckedChange={handleFeaturedToggle}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="details" className="h-full flex flex-col">
              <TabsList className="mx-6 mt-4 w-fit">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="details" className="h-full overflow-y-auto p-6 mt-0">
                  <div className="max-w-2xl mx-auto space-y-6">
                    {/* Post Image */}
                    {post.image && (
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Title and Status */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={isPublished ? "default" : "secondary"}>{post.published ? "Published" : "Un-publish"}</Badge>
                        {post.featured && <Badge variant="outline">Featured</Badge>}
                      </div>
                      <h1 className="text-2xl font-bold text-balance">{post.title}</h1>
                      <p className="text-muted-foreground text-pretty">{post.description}</p>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Author:</span>
                        <span className="font-medium">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">ID:</span>
                        <span className="font-mono text-xs">{post.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Reading:</span>
                        <span className="font-medium">{readingTime} min</span>
                      </div>
                    </div>

                    {/* Category and Tags */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Category:</span>
                        <Badge variant="outline" className="ml-2">
                          {post.category.name}
                        </Badge>
                      </div>
                      {post.tag && post.tag.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.tag.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="h-full overflow-y-auto p-6 mt-0">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-lg font-medium mb-4">Post Content</h3>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-muted-foreground whitespace-pre-wrap">{post.content}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="metadata" className="h-full overflow-y-auto p-6 mt-0">
                  <div className="max-w-2xl mx-auto space-y-4">
                    <h3 className="text-lg font-medium">Technical Metadata</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Word Count:</span>
                        <span className="font-mono">{post.content.split(" ").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Character Count:</span>
                        <span className="font-mono">{post.content.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Modified:</span>
                        <span className="font-mono">{new Date(post.createdAt).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant={isPublished ? "default" : "secondary"}>{post.published ? "Published" : "Un-published"}</Badge>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
