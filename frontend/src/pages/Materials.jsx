import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { FileText, Video, File, Music, Search, Plus, Filter, FolderPlus, MoreVertical, Play, Edit, Trash2, Download, Share } from "lucide-react";
const Materials = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [materials, setMaterials] = useState([
        {
            id: "1",
            title: "Introduction to Machine Learning",
            type: "pdf",
            dateAdded: "2023-09-10",
            size: "5.2 MB",
            favorite: true,
            category: "Computer Science",
        },
        {
            id: "2",
            title: "Advanced CSS Techniques",
            type: "pdf",
            dateAdded: "2023-09-05",
            size: "3.8 MB",
            favorite: false,
            category: "Web Development",
        },
        {
            id: "3",
            title: "Data Structures Tutorial",
            type: "video",
            dateAdded: "2023-08-28",
            size: "128 MB",
            favorite: true,
            category: "Computer Science",
        },
        {
            id: "4",
            title: "English Grammar Basics",
            type: "doc",
            dateAdded: "2023-08-15",
            size: "1.5 MB",
            favorite: false,
            category: "Language",
        },
        {
            id: "5",
            title: "History of Ancient Rome",
            type: "audio",
            dateAdded: "2023-08-10",
            size: "45 MB",
            favorite: false,
            category: "History",
        },
        {
            id: "6",
            title: "Physics Fundamentals",
            type: "pdf",
            dateAdded: "2023-07-22",
            size: "7.2 MB",
            favorite: true,
            category: "Science",
        },
    ]);
    const getTypeIcon = (type) => {
        switch (type) {
            case "pdf":
                return <FileText className="h-5 w-5 text-red-500"/>;
            case "video":
                return <Video className="h-5 w-5 text-blue-500"/>;
            case "audio":
                return <Music className="h-5 w-5 text-purple-500"/>;
            case "doc":
                return <File className="h-5 w-5 text-blue-700"/>;
            default:
                return <File className="h-5 w-5 text-gray-500"/>;
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };
    const filteredMaterials = materials.filter((material) => {
        const matchesSearch = material.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        if (activeTab === "all")
            return matchesSearch;
        if (activeTab === "favorites")
            return matchesSearch && material.favorite;
        return matchesSearch && material.type === activeTab;
    });
    const toggleFavorite = (id) => {
        setMaterials(materials.map((material) => material.id === id
            ? { ...material, favorite: !material.favorite }
            : material));
    };
    const deleteMaterial = (id) => {
        setMaterials(materials.filter((material) => material.id !== id));
    };
    const categories = Array.from(new Set(materials.map((m) => m.category)));
    return (<div className="container mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Learning Materials</h1>
          <p className="text-muted-foreground">
            Manage and organize all your learning resources
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Link to="/upload">
            <Button>
              <Plus className="h-4 w-4 mr-2"/>
              Upload New
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FolderPlus className="h-4 w-4 mr-2"/>
                New Collection
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Create Study Collection</DropdownMenuItem>
              <DropdownMenuItem>Create Course Folder</DropdownMenuItem>
              <DropdownMenuItem>Create Project Folder</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"/>
                <Input type="search" placeholder="Search materials..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8"/>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="md:w-auto w-full">
                    <Filter className="h-4 w-4 mr-2"/>
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>Recently Added</DropdownMenuItem>
                  <DropdownMenuItem>Alphabetical (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Alphabetical (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem>Size (Largest First)</DropdownMenuItem>
                  <DropdownMenuItem>Size (Smallest First)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-6 mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pdf">PDFs</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="audio">Audio</TabsTrigger>
                <TabsTrigger value="doc">Documents</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {filteredMaterials.length > 0 ? (<div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-muted p-4 text-sm font-medium">
                      <div className="col-span-5">Name</div>
                      <div className="col-span-2 hidden md:block">Category</div>
                      <div className="col-span-2 hidden md:block">Added</div>
                      <div className="col-span-2 hidden md:block">Size</div>
                      <div className="col-span-1 text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {filteredMaterials.map((material) => (<div key={material.id} className="grid grid-cols-12 items-center p-4 hover:bg-muted/50 transition-colors">
                          <div className="col-span-5 flex items-center">
                            <div className="mr-3">
                              {getTypeIcon(material.type)}
                            </div>
                            <div className="truncate">
                              <div className="font-medium truncate">
                                {material.title}
                              </div>
                              <div className="text-sm text-muted-foreground md:hidden">
                                {material.category}
                              </div>
                            </div>
                          </div>
                          <div className="col-span-2 hidden md:block text-muted-foreground">
                            {material.category}
                          </div>
                          <div className="col-span-2 hidden md:block text-muted-foreground">
                            {formatDate(material.dateAdded)}
                          </div>
                          <div className="col-span-2 hidden md:block text-muted-foreground">
                            {material.size}
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4"/>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2"/>
                                  Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleFavorite(material.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={material.favorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                                  </svg>
                                  {material.favorite ? "Remove from Favorites" : "Add to Favorites"}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {material.type === "video" ? (<>
                                      <Play className="h-4 w-4 mr-2"/>
                                      Play
                                    </>) : (<>
                                      <FileText className="h-4 w-4 mr-2"/>
                                      Open
                                    </>)}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2"/>
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="h-4 w-4 mr-2"/>
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={() => deleteMaterial(material.id)}>
                                  <Trash2 className="h-4 w-4 mr-2"/>
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>))}
                    </div>
                  </div>) : (<div className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4"/>
                    <h3 className="text-xl font-medium mb-2">No materials found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery
                ? `No results found for "${searchQuery}"`
                : activeTab === "favorites"
                    ? "You haven't added any materials to your favorites yet."
                    : `You don't have any ${activeTab} materials yet.`}
                    </p>
                    <Link to="/upload">
                      <Button>
                        <Plus className="h-4 w-4 mr-2"/>
                        Upload Materials
                      </Button>
                    </Link>
                  </div>)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {categories.map((category) => {
            const categoryCount = materials.filter((m) => m.category === category).length;
            return (<Card key={category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{categoryCount}</div>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>);
        })}
          
          <Card className="bg-gray-50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center h-full py-6">
              <Plus className="h-8 w-8 text-muted-foreground mb-2"/>
              <p className="text-muted-foreground">Add New Category</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
};
export default Materials;
