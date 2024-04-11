<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'caption' => 'required|string|max:255',
            'image' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        $post = new Post;
        $post->caption = $request->caption;
        $post->user_id = Auth::id();

        $imageData = base64_decode(explode(',', $request->image)[1]);
        $fileName = uniqid() . '.jpg';
        $path = storage_path('app/public/images') . '/' . $fileName;
        file_put_contents($path, $imageData);
    
        $post->image = $fileName;
        $post->save();
    
        return response()->json($post, 201);
    }

    public function getAllPosts()
    {
        $posts = Post::with('user')->get();
        return response()->json($posts, 200);
    }

    public function getPostById(int $id)
    {
        $post = Post::findOrfail($id);
        return response()->json(['post' => $post], 200);
    }

    public function updatePost(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'caption' => 'required|string|max:255',
            'image_url' => 'nullable|string|url',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $post = Post::findOrfail($id);
    
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $post->caption = $request->caption;
    
        if ($request->has('image_url')) {
            $post->image_url = $request->image_url;
        }
    
        $post->save();
        return response()->json($post, 200);
    }

    public function deletePost(int $id) 
    {
        $post = Post::findOrfail($id);

        $post->delete();
        return response()->json(['message' => 'Post deleted'], 200);
    }
}
