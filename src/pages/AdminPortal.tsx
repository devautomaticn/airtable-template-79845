import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Grid2X2, 
  List, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  EyeIcon,
  ExternalLink,
  Check,
  ArrowLeft,
  Tag,
  Loader2,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Template, TemplateSubmission } from '@/types/template';
import { fetchAllTemplates, createTemplate, updateTemplate, deleteTemplate } from '@/services/templateService';
import { loginToAdminPortal, logoutFromAdminPortal, getCurrentUser } from '@/services/authService';

const featureOptions = [
  "Easy Setup",
  "Scalable",
  "Video Walkthrough",
  "Pre-Built Views",
  "Kanban",
  "Calendar",
  "Timeline",
  "Gantt",
  "Gallery",
  "Dashboard",
  "KPI Tracking",
  "Interfaces"
];

const AdminPortal = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isNewTemplateDialog, setIsNewTemplateDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Omit<Template, 'id' | 'createdAt'>>({
    title: "",
    description: "",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1674&auto=format&fit=crop",
    category: "",
    status: 'draft',
    source: 'admin',
    creator: {
      name: "",
      email: "",
      description: ""
    },
    features: [""],
    useCases: [""],
    baseUrl: "",
    walkthroughVideoUrl: ""
  });

  useEffect(() => {
    const checkAuthStatus = async () => {
      setAuthLoading(true);
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
      setAuthLoading(false);
      
      if (!user) {
        setIsLoginOpen(true);
      } else {
        loadTemplates();
      }
    };
    
    checkAuthStatus();
  }, []);

  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllTemplates();
      setTemplates(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load templates:', err);
      setError('Failed to load templates. Please try again.');
      toast.error('Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    
    try {
      const result = await loginToAdminPortal(loginEmail, loginPassword);
      
      if (result.success) {
        setIsAuthenticated(true);
        setIsLoginOpen(false);
        setLoginEmail('');
        setLoginPassword('');
        toast.success('Login successful');
        loadTemplates();
      } else {
        toast.error(result.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    setAuthLoading(true);
    
    try {
      await logoutFromAdminPortal();
      setIsAuthenticated(false);
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const filteredTemplates = templates.filter(
    template => 
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (template: Template) => {
    setSelectedTemplate(template);
    setEditedTemplate(template);
    setIsEditMode(false);
    setIsDetailOpen(true);
  };

  const handleEditTemplate = () => {
    setIsEditMode(true);
  };

  const handleSaveTemplate = async () => {
    if (!editedTemplate) return;
    
    try {
      setIsLoading(true);
      const updated = await updateTemplate(editedTemplate);
      setTemplates(templates.map(t => t.id === updated.id ? updated : t));
      setSelectedTemplate(updated);
      setEditedTemplate(updated);
      setIsEditMode(false);
      toast.success('Template updated successfully!');
    } catch (err) {
      console.error('Failed to update template:', err);
      toast.error('Failed to update template');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteTemplate(id);
      setTemplates(templates.filter(t => t.id !== id));
      setIsDetailOpen(false);
      toast.success('Template deleted successfully');
    } catch (err) {
      console.error('Failed to delete template:', err);
      toast.error('Failed to delete template');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    const template = templates.find(t => t.id === id);
    if (!template) return;

    const updatedStatus = template.status === 'draft' ? 'published' : 'draft';
    const updatedTemplate = { ...template, status: updatedStatus as 'draft' | 'published' };
    
    try {
      setIsLoading(true);
      const updated = await updateTemplate(updatedTemplate);
      
      setTemplates(templates.map(t => t.id === id ? updated : t));
      
      if (selectedTemplate && selectedTemplate.id === id) {
        setSelectedTemplate(updated);
        setEditedTemplate(updated);
      }
      
      toast.success(`Template ${updatedStatus === 'published' ? 'published' : 'unpublished'} successfully`);
    } catch (err) {
      console.error(`Failed to ${updatedStatus === 'published' ? 'publish' : 'unpublish'} template:`, err);
      toast.error(`Failed to ${updatedStatus === 'published' ? 'publish' : 'unpublish'} template`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, field: string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    
    setEditedTemplate(prev => {
      if (!prev) return prev;
      
      if (field.startsWith('features[')) {
        const index = parseInt(field.match(/\d+/)![0]);
        const newFeatures = [...prev.features];
        newFeatures[index] = value;
        
        const filteredFeatures = newFeatures.filter(f => f.trim() !== '');
        
        while (filteredFeatures.length < 1) {
          filteredFeatures.push('');
        }
        
        return { ...prev, features: filteredFeatures.slice(0, 3) };
      } else if (field.startsWith('useCases[')) {
        const index = parseInt(field.match(/\d+/)![0]);
        const newUseCases = [...prev.useCases];
        newUseCases[index] = value;
        
        const filteredUseCases = newUseCases.filter(u => u.trim() !== '');
        
        while (filteredUseCases.length < 1) {
          filteredUseCases.push('');
        }
        
        return { ...prev, useCases: filteredUseCases.slice(0, 3) };
      } else if (field.startsWith('creator.')) {
        const creatorField = field.split('.')[1];
        return { ...prev, creator: { ...prev.creator, [creatorField]: value } };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const handleAddFeature = () => {
    setEditedTemplate(prev => {
      if (!prev) return prev;
      
      const features = [...prev.features];
      if (features.length < 3) {
        features.push('');
      }
      
      return { ...prev, features };
    });
  };

  const handleAddUseCase = () => {
    setEditedTemplate(prev => {
      if (!prev) return prev;
      
      const useCases = [...prev.useCases];
      if (useCases.length < 3) {
        useCases.push('');
      }
      
      return { ...prev, useCases };
    });
  };

  const handleRemoveFeature = (index: number) => {
    setEditedTemplate(prev => {
      if (!prev) return prev;
      
      const features = [...prev.features];
      features.splice(index, 1);
      
      if (features.length === 0) {
        features.push('');
      }
      
      return { ...prev, features };
    });
  };

  const handleRemoveUseCase = (index: number) => {
    setEditedTemplate(prev => {
      if (!prev) return prev;
      
      const useCases = [...prev.useCases];
      useCases.splice(index, 1);
      
      if (useCases.length === 0) {
        useCases.push('');
      }
      
      return { ...prev, useCases };
    });
  };

  const handleNewTemplateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, field: string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    
    setNewTemplate(prev => {
      if (field.startsWith('features[')) {
        const index = parseInt(field.match(/\d+/)![0]);
        const newFeatures = [...prev.features];
        newFeatures[index] = value;
        
        const filteredFeatures = newFeatures.filter(f => f.trim() !== '');
        
        while (filteredFeatures.length < 1) {
          filteredFeatures.push('');
        }
        
        return { ...prev, features: filteredFeatures.slice(0, 3) };
      } else if (field.startsWith('useCases[')) {
        const index = parseInt(field.match(/\d+/)![0]);
        const newUseCases = [...prev.useCases];
        newUseCases[index] = value;
        
        const filteredUseCases = newUseCases.filter(u => u.trim() !== '');
        
        while (filteredUseCases.length < 1) {
          filteredUseCases.push('');
        }
        
        return { ...prev, useCases: filteredUseCases.slice(0, 3) };
      } else if (field.startsWith('creator.')) {
        const creatorField = field.split('.')[1];
        return { ...prev, creator: { ...prev.creator, [creatorField]: value } };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const handleOpenNewTemplateDialog = () => {
    setIsNewTemplateDialog(true);
  };

  const handleAddNewFeature = () => {
    setNewTemplate(prev => {
      const features = [...prev.features];
      if (features.length < 3) {
        features.push('');
      }
      
      return { ...prev, features };
    });
  };

  const handleAddNewUseCase = () => {
    setNewTemplate(prev => {
      const useCases = [...prev.useCases];
      if (useCases.length < 3) {
        useCases.push('');
      }
      
      return { ...prev, useCases };
    });
  };

  const handleRemoveNewFeature = (index: number) => {
    setNewTemplate(prev => {
      const features = [...prev.features];
      features.splice(index, 1);
      
      if (features.length === 0) {
        features.push('');
      }
      
      return { ...prev, features };
    });
  };

  const handleRemoveNewUseCase = (index: number) => {
    setNewTemplate(prev => {
      const useCases = [...prev.useCases];
      useCases.splice(index, 1);
      
      if (useCases.length === 0) {
        useCases.push('');
      }
      
      return { ...prev, useCases };
    });
  };

  const handleCreateNewTemplate = async () => {
    try {
      setIsLoading(true);
      
      if (!newTemplate.title) {
        toast.error('Template title is required');
        setIsLoading(false);
        return;
      }
      
      if (!newTemplate.creator.name) {
        toast.error('Creator name is required');
        setIsLoading(false);
        return;
      }
      
      if (!newTemplate.creator.email) {
        toast.error('Creator email is required');
        setIsLoading(false);
        return;
      }
      
      const cleanTemplate = {
        ...newTemplate,
        features: newTemplate.features.filter(f => f.trim() !== ''),
        useCases: newTemplate.useCases.filter(u => u.trim() !== '')
      };
      
      console.log('Creating template with cleaned data:', cleanTemplate);
      
      const created = await createTemplate(cleanTemplate);
      console.log('Template created successfully:', created);
      
      setTemplates([...templates, created]);
      setIsNewTemplateDialog(false);
      
      setNewTemplate({
        title: "",
        description: "",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1674&auto=format&fit=crop",
        category: "",
        status: 'draft',
        source: 'admin',
        creator: {
          name: "",
          email: "",
          description: ""
        },
        features: [""],
        useCases: [""],
        baseUrl: "",
        walkthroughVideoUrl: ""
      });
      
      toast.success('New template created!');
    } catch (error) {
      console.error('Failed to create template:', error);
      if (error instanceof Error) {
        toast.error(`Failed to create template: ${error.message}`);
      } else {
        toast.error('Failed to create template');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-airtable-blue" />
        <p className="mt-4 text-gray-600">Authenticating...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-airtable-blue hover:bg-airtable-blue/90"
                disabled={authLoading}
              >
                {authLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/" className="text-sm text-airtable-blue hover:underline">
                Return to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading && templates.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-airtable-blue" />
        <p className="mt-4 text-gray-600">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="relative h-9 w-9">
                  <div className="absolute top-0 left-0 h-4 w-4 bg-airtable-yellow rounded-sm transform rotate-45" />
                  <div className="absolute bottom-0 left-0 h-4 w-4 bg-airtable-pink rounded-sm" />
                  <div className="absolute bottom-0 right-0 h-4 w-4 bg-airtable-blue rounded-sm" />
                </div>
                <span className="font-bold text-xl text-airtable-black">Admin Portal</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              <Link to="/">
                <Button variant="outline">Back to Site</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Manage Templates</h1>
          <div className="flex items-center gap-3">
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search templates..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center bg-white border rounded-md">
              <Button 
                variant="ghost" 
                size="icon"
                className={viewMode === 'grid' ? 'bg-gray-100' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className={viewMode === 'list' ? 'bg-gray-100' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              className="bg-airtable-blue hover:bg-airtable-blue/90"
              onClick={handleOpenNewTemplateDialog}
            >
              <Plus className="h-4 w-4 mr-2" /> New Template
            </Button>
          </div>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={loadTemplates} className="bg-airtable-blue hover:bg-airtable-blue/90">
              Try Again
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={template.image} 
                      alt={template.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className={template.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {template.status === 'published' ? 'Published' : 'Draft'}
                      </Badge>
                      {template.source && (
                        <Badge className={template.source === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                          {template.source === 'admin' ? 'Admin' : 'Submission'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">
                        {new Date(template.createdAt).toLocaleDateString()}
                      </p>
                      <h3 className="font-semibold text-lg line-clamp-1">{template.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{template.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-500">
                        By {template.creator.name}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2"
                          onClick={() => handleToggleStatus(template.id)}
                          disabled={isLoading}
                        >
                          {template.status === 'published' ? 'Unpublish' : 'Publish'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 px-2"
                          onClick={() => handleViewDetails(template)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">No templates available. Create your first template!</p>
              </div>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Creator</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>
                          <div className="font-medium">{template.title}</div>
                        </TableCell>
                        <TableCell>{template.category}</TableCell>
                        <TableCell>{template.creator.name}</TableCell>
                        <TableCell>{new Date(template.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={template.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {template.status === 'published' ? 'Published' : 'Draft'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {template.source && (
                            <Badge className={template.source === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                              {template.source === 'admin' ? 'Admin' : 'Submission'}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8"
                              onClick={() => handleToggleStatus(template.id)}
                              disabled={isLoading}
                            >
                              {template.status === 'published' ? 'Unpublish' : 'Publish'}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleViewDetails(template)}
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => handleDeleteTemplate(template.id)}
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        <p className="text-gray-500">No templates available. Create your first template!</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </main>

      {selectedTemplate && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? 'Edit Template' : 'Template Details'}
              </DialogTitle>
              <DialogDescription>
                {isEditMode 
                  ? 'Make changes to this template. Click save when you\'re done.' 
                  : 'View complete information for this template.'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6">
              {!isEditMode && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge className={selectedTemplate.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {selectedTemplate.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                    {selectedTemplate.source && (
                      <Badge className={selectedTemplate.source === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                        {selectedTemplate.source === 'admin' ? 'Admin' : 'Submission'}
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500">
                      Created: {new Date(selectedTemplate.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleToggleStatus(selectedTemplate.id)}
                      disabled={isLoading}
                    >
                      {selectedTemplate.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button 
                      onClick={handleEditTemplate}
                      className="bg-airtable-blue hover:bg-airtable-blue/90"
                    >
                      <Edit className="h-4 w-4 mr-2" /> Edit Template
                    </Button>
                  </div>
                </div>
              )}

              {isEditMode && (
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant={editedTemplate?.status === 'draft' ? 'default' : 'outline'}
                      className={editedTemplate?.status === 'draft' ? 'bg-gray-800' : ''}
                      onClick={() => setEditedTemplate({...editedTemplate!, status: 'draft'})}
                    >
                      Draft
                    </Button>
                    <Button 
                      variant={editedTemplate?.status === 'published' ? 'default' : 'outline'}
                      className={editedTemplate?.status === 'published' ? 'bg-green-600' : ''}
                      onClick={() => setEditedTemplate({...editedTemplate!, status: 'published'})}
                    >
                      Published
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-4">Template Section</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="templateName">Template Name</Label>
                    {isEditMode ? (
                      <Input 
                        id="templateName" 
                        value={editedTemplate?.title || ''} 
                        onChange={(e) => handleEditChange(e, 'title')}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{selectedTemplate.title}</div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    {isEditMode ? (
                      <textarea
                        id="description"
                        value={editedTemplate?.description || ''}
                        onChange={(e) => handleEditChange(e, 'description')}
                        rows={4}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{selectedTemplate.description}</div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    {isEditMode ? (
                      <Input 
                        id="image" 
                        value={editedTemplate?.image || ''} 
                        onChange={(e) => handleEditChange(e, 'image')}
                        placeholder="https://example.com/image.jpg"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded overflow-hidden text-ellipsis">
                        {selectedTemplate.image}
                      </div>
                    )}
                    <div className="aspect-video overflow-hidden rounded-md">
                      <img 
                        src={isEditMode ? editedTemplate?.image : selectedTemplate.image} 
                        alt={isEditMode ? editedTemplate?.title : selectedTemplate.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    {isEditMode ? (
                      <Input 
                        id="category" 
                        value={editedTemplate?.category || ''} 
                        onChange={(e) => handleEditChange(e, 'category')}
                        placeholder="e.g. Project Management, Marketing"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{selectedTemplate.category || 'Not specified'}</div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="baseUrl">Airtable Base URL</Label>
                    {isEditMode ? (
                      <Input 
                        id="baseUrl" 
                        value={editedTemplate?.baseUrl || ''} 
                        onChange={(e) => handleEditChange(e, 'baseUrl')}
                        placeholder="https://airtable.com/app..."
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {selectedTemplate.baseUrl ? (
                          <a href={selectedTemplate.baseUrl} target="_blank" rel="noopener noreferrer" className="text-airtable-blue hover:underline flex items-center">
                            {selectedTemplate.baseUrl}
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        ) : 'Not specified'}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="walkthroughVideoUrl">Walkthrough Video URL</Label>
                    {isEditMode ? (
                      <Input 
                        id="walkthroughVideoUrl" 
                        value={editedTemplate?.walkthroughVideoUrl || ''} 
                        onChange={(e) => handleEditChange(e, 'walkthroughVideoUrl')}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">
                        {selectedTemplate.walkthroughVideoUrl ? (
                          <a href={selectedTemplate.walkthroughVideoUrl} target="_blank" rel="noopener noreferrer" className="text-airtable-blue hover:underline flex items-center">
                            {selectedTemplate.walkthroughVideoUrl}
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        ) : 'Not specified'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-4">Key Features Section</h3>
                <div className="grid gap-4">
                  {isEditMode ? (
                    <>
                      {editedTemplate?.features.map((feature, index) => (
                        <div key={`feature-${index}`} className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`feature-${index}`}>Key Feature {index + 1}</Label>
                            {index > 0 && (
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveFeature(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <Input 
                            id={`feature-${index}`}
                            value={feature}
                            onChange={(e) => handleEditChange(e, `features[${index}]`)}
                            placeholder={`Enter feature ${index + 1}`}
                          />
                        </div>
                      ))}
                      {editedTemplate && editedTemplate.features.length < 3 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddFeature}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Feature
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="grid gap-2">
                      {selectedTemplate.features.map((feature, index) => (
                        <div key={`feature-view-${index}`} className="p-2 bg-gray-50 rounded">
                          {feature}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-4">Use Cases Section</h3>
                <div className="grid gap-4">
                  {isEditMode ? (
                    <>
                      {editedTemplate?.useCases.map((useCase, index) => (
                        <div key={`useCase-${index}`} className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`useCase-${index}`}>Use Case {index + 1}</Label>
                            {index > 0 && (
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRemoveUseCase(index)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <Input 
                            id={`useCase-${index}`} 
                            value={useCase} 
                            onChange={(e) => handleEditChange(e, `useCases[${index}]`)}
                            placeholder={`Enter use case ${index + 1}`}
                          />
                        </div>
                      ))}
                      {editedTemplate && editedTemplate.useCases.length < 3 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleAddUseCase}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Use Case
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="grid gap-2">
                      {selectedTemplate.useCases.map((useCase, index) => (
                        <div key={`useCase-view-${index}`} className="p-2 bg-gray-50 rounded">
                          {useCase}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-4">Creator Information</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="creatorName">Creator Name</Label>
                    {isEditMode ? (
                      <Input 
                        id="creatorName" 
                        value={editedTemplate?.creator.name || ''} 
                        onChange={(e) => handleEditChange(e, 'creator.name')}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{selectedTemplate.creator.name || 'Not specified'}</div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="creatorEmail">Creator Email</Label>
                    {isEditMode ? (
                      <Input 
                        id="creatorEmail" 
                        value={editedTemplate?.creator.email || ''} 
                        onChange={(e) => handleEditChange(e, 'creator.email')}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{selectedTemplate.creator.email || 'Not specified'}</div>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="creatorDescription">Creator Description</Label>
                    {isEditMode ? (
                      <textarea
                        id="creatorDescription"
                        value={editedTemplate?.creator.description || ''}
                        onChange={(e) => handleEditChange(e, 'creator.description')}
                        rows={3}
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 rounded">{selectedTemplate.creator.description || 'Not specified'}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {isEditMode && (
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveTemplate} 
                  className="bg-airtable-blue hover:bg-airtable-blue/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isNewTemplateDialog} onOpenChange={setIsNewTemplateDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Fill out the form below to create a new template.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label>Status</Label>
              <div className="flex items-center gap-4">
                <Button 
                  variant={newTemplate.status === 'draft' ? 'default' : 'outline'}
                  className={newTemplate.status === 'draft' ? 'bg-gray-800' : ''}
                  onClick={() => setNewTemplate({...newTemplate, status: 'draft'})}
                >
                  Draft
                </Button>
                <Button 
                  variant={newTemplate.status === 'published' ? 'default' : 'outline'}
                  className={newTemplate.status === 'published' ? 'bg-green-600' : ''}
                  onClick={() => setNewTemplate({...newTemplate, status: 'published'})}
                >
                  Published
                </Button>
              </div>
            </div>
            
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Template Details</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="templateName">Template Name*</Label>
                  <Input 
                    id="templateName" 
                    value={newTemplate.title} 
                    onChange={(e) => handleNewTemplateChange(e, 'title')}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => handleNewTemplateChange(e, 'description')}
                    rows={4}
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input 
                    id="image" 
                    value={newTemplate.image} 
                    onChange={(e) => handleNewTemplateChange(e, 'image')}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    value={newTemplate.category} 
                    onChange={(e) => handleNewTemplateChange(e, 'category')}
                    placeholder="e.g. Project Management, Marketing"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="baseUrl">Airtable Base URL</Label>
                  <Input 
                    id="baseUrl" 
                    value={newTemplate.baseUrl || ''} 
                    onChange={(e) => handleNewTemplateChange(e, 'baseUrl')}
                    placeholder="https://airtable.com/app..."
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="walkthroughVideoUrl">Walkthrough Video URL</Label>
                  <Input 
                    id="walkthroughVideoUrl" 
                    value={newTemplate.walkthroughVideoUrl || ''} 
                    onChange={(e) => handleNewTemplateChange(e, 'walkthroughVideoUrl')}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>
            
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Key Features Section</h3>
              <div className="grid gap-4">
                {newTemplate.features.map((feature, index) => (
                  <div key={`new-feature-${index}`} className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`new-feature-${index}`}>Key Feature {index + 1}</Label>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveNewFeature(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <Input 
                      id={`new-feature-${index}`}
                      value={feature}
                      onChange={(e) => handleNewTemplateChange(e, `features[${index}]`)}
                      placeholder={`Enter feature ${index + 1}`}
                    />
                  </div>
                ))}
                {newTemplate.features.length < 3 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddNewFeature}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                )}
              </div>
            </div>
            
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Use Cases Section</h3>
              <div className="grid gap-4">
                {newTemplate.useCases.map((useCase, index) => (
                  <div key={`new-useCase-${index}`} className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`new-useCase-${index}`}>Use Case {index + 1}</Label>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveNewUseCase(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <Input 
                      id={`new-useCase-${index}`} 
                      value={useCase} 
                      onChange={(e) => handleNewTemplateChange(e, `useCases[${index}]`)}
                      placeholder={`Enter use case ${index + 1}`}
                    />
                  </div>
                ))}
                {newTemplate.useCases.length < 3 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddNewUseCase}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Use Case
                  </Button>
                )}
              </div>
            </div>
            
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Creator Information</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="creatorName">Creator Name*</Label>
                  <Input 
                    id="creatorName" 
                    value={newTemplate.creator.name} 
                    onChange={(e) => handleNewTemplateChange(e, 'creator.name')}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="creatorEmail">Creator Email*</Label>
                  <Input 
                    id="creatorEmail" 
                    value={newTemplate.creator.email} 
                    onChange={(e) => handleNewTemplateChange(e, 'creator.email')}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="creatorDescription">Creator Description</Label>
                  <textarea
                    id="creatorDescription"
                    value={newTemplate.creator.description || ''}
                    onChange={(e) => handleNewTemplateChange(e, 'creator.description')}
                    rows={3}
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => setIsNewTemplateDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateNewTemplate} 
              className="bg-airtable-blue hover:bg-airtable-blue/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Template'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPortal;
