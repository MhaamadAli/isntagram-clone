<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function create(Request $request)
    {
        $data = $request->validate([
            'caption' => ['required', 'string', 'max:300'],
            'post_image' => ['required'],
        ]);

        $imageData = $data['post_image'];

        if (preg_match('/^data:(image\/[a-z]+);base64,/', $imageData, $matches)) {
            $mimeType = $matches[1];

            $imageData = str_replace($matches[0], '', $imageData);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Invalid image data'], 400);
        }

        $imageData = str_replace(' ', '+', $imageData);

        $imageData = base64_decode($imageData);

        $extensions = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/gif' => 'gif',
        ];

        $fileExtension = $extensions[$mimeType] ?? 'jpg';

        $imageName = Str::random(32) . '.' . $fileExtension;

        Storage::disk('public')->put($imageName, $imageData);

        $post = new Post();
        $post->caption = $data['caption'];
        $post->image = $imageName;
        $post->user_id = auth()->id();
        $post->save();
        return response()->json(['status' => 'success', 'message' => 'Post added successfully'], 201);
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
