import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { UploadCloud, Link2, AlertCircle, FileUp, File, X, Check } from "lucide-react";
const Upload = () => {
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const [newUrl, setNewUrl] = useState("");
    const [uploadProgress, setUploadProgress] = useState({});
    const [isUploading, setIsUploading] = useState(false);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const fileInputRef = useRef(null);
    const { toast } = useToast();
    const handleFileChange = (e) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };
    const handleFileDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files);
            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    const addUrl = () => {
        if (newUrl.trim() && isValidUrl(newUrl)) {
            setUrls((prevUrls) => [...prevUrls, newUrl]);
            setNewUrl("");
        }
        else {
            toast({
                title: "Invalid URL",
                description: "Please enter a valid URL",
                variant: "destructive",
            });
        }
    };
    const removeUrl = (index) => {
        setUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };
    const isValidUrl = (urlString) => {
        try {
            new URL(urlString);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    const uploadFiles = () => {
        if (files.length === 0 && urls.length === 0) {
            toast({
                title: "No content to upload",
                description: "Please add files or URLs before uploading",
                variant: "destructive",
            });
            return;
        }
        if (!category) {
            toast({
                title: "Category required",
                description: "Please select a category for your uploads",
                variant: "destructive",
            });
            return;
        }
        setIsUploading(true);
        // Simulate upload progress for each file
        files.forEach((file, index) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress > 100) {
                    progress = 100;
                    clearInterval(interval);
                    // Check if all files completed
                    const allCompleted = Object.values({
                        ...uploadProgress,
                        [file.name]: progress,
                    }).every(p => p === 100);
                    if (allCompleted && index === files.length - 1) {
                        setTimeout(() => {
                            setIsUploading(false);
                            setFiles([]);
                            setUrls([]);
                            setCategory("");
                            setDescription("");
                            setUploadProgress({});
                            toast({
                                title: "Upload completed",
                                description: `Successfully uploaded ${files.length} files and ${urls.length} URLs`,
                            });
                        }, 1000);
                    }
                }
                setUploadProgress(prev => ({
                    ...prev,
                    [file.name]: Math.round(progress),
                }));
            }, 300);
        });
        // If no files but only URLs, simulate completion
        if (files.length === 0 && urls.length > 0) {
            setTimeout(() => {
                setIsUploading(false);
                setUrls([]);
                setCategory("");
                setDescription("");
                toast({
                    title: "Upload completed",
                    description: `Successfully added ${urls.length} URLs to your materials`,
                });
            }, 1500);
        }
    };
    const getFileIcon = (fileName) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'pdf':
                return <File className="h-5 w-5 text-red-500"/>;
            case 'doc':
            case 'docx':
                return <File className="h-5 w-5 text-blue-700"/>;
            case 'xls':
            case 'xlsx':
                return <File className="h-5 w-5 text-green-600"/>;
            case 'ppt':
            case 'pptx':
                return <File className="h-5 w-5 text-orange-500"/>;
            case 'mp4':
            case 'mov':
            case 'avi':
                return <File className="h-5 w-5 text-purple-500"/>;
            case 'mp3':
            case 'wav':
                return <File className="h-5 w-5 text-pink-500"/>;
            case 'jpg':
            case 'jpeg':
            case 'png':
                return <File className="h-5 w-5 text-teal-500"/>;
            default:
                return <File className="h-5 w-5 text-gray-500"/>;
        }
    };
    return (<div className="container mx-auto animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Upload Learning Materials</h1>
        <p className="text-muted-foreground">
          Add new study materials to your personal learning library
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Content</CardTitle>
          <CardDescription>
            Upload files or add URLs to online learning resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Files</TabsTrigger>
              <TabsTrigger value="url">Add URLs</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-6">
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${files.length > 0 ? "border-gray-300" : "border-gray-200 hover:border-gray-300"}`} onDrop={handleFileDrop} onDragOver={handleDragOver}>
                <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileChange}/>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <UploadCloud className="h-12 w-12 text-gray-400"/>
                  <div>
                    <h3 className="text-lg font-medium">Drag and drop your files</h3>
                    <p className="text-sm text-muted-foreground">
                      or{" "}
                      <button className="text-brand-600 hover:text-brand-700 font-medium" onClick={() => fileInputRef.current?.click()}>
                        browse
                      </button>{" "}
                      to upload
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, PPT, XLS, MP4, MP3, and more
                  </p>
                </div>
              </div>

              {files.length > 0 && (<div className="space-y-4">
                  <h3 className="text-sm font-medium">Selected Files</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {files.map((file, index) => (<div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                        <div className="flex items-center">
                          {getFileIcon(file.name)}
                          <div className="ml-2">
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {uploadProgress[file.name] !== undefined && (<div className="flex items-center space-x-2">
                              {uploadProgress[file.name] === 100 ? (<Check className="h-4 w-4 text-green-500"/>) : (<div className="text-xs">
                                  {uploadProgress[file.name]}%
                                </div>)}
                            </div>)}
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(index)} disabled={isUploading}>
                            <X className="h-4 w-4"/>
                          </Button>
                        </div>
                      </div>))}
                  </div>
                </div>)}
            </TabsContent>

            <TabsContent value="url" className="space-y-6">
              <div className="grid gap-4">
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input type="url" placeholder="Enter URL to learning resource (e.g., YouTube video, article)" value={newUrl} onChange={(e) => setNewUrl(e.target.value)}/>
                  </div>
                  <Button onClick={addUrl} type="button">
                    Add URL
                  </Button>
                </div>

                {urls.length > 0 ? (<div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {urls.map((url, index) => (<div key={index} className="flex items-center justify-between py-2 px-3 border rounded-md">
                        <div className="flex items-center">
                          <Link2 className="h-5 w-5 text-gray-500"/>
                          <p className="ml-2 text-sm font-medium truncate max-w-md">
                            {url}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeUrl(index)} disabled={isUploading}>
                          <X className="h-4 w-4"/>
                        </Button>
                      </div>))}
                  </div>) : (<Alert className="bg-muted/50">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertDescription>
                      Add URLs to online resources like YouTube videos, articles,
                      or online courses.
                    </AlertDescription>
                  </Alert>)}
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4 mt-6">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="art">Art & Design</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea id="description" placeholder="Add notes or description about these materials" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={uploadFiles} disabled={isUploading}>
              {isUploading ? ("Uploading...") : (<>
                  <FileUp className="h-4 w-4 mr-2"/>
                  Upload Materials
                </>)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>);
};
export default Upload;
