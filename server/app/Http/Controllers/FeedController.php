<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class FeedController extends Controller
{
    public function getAll()
    {
        $user = auth()->user();
        $followedUserId = $user-> followings-> pluck('id');

        $posts = Post::with('user')-> whereIn('user_id', $followedUserId)->get();
        return response()->json(['status' => 'success', 'posts' => $posts]);
    }
}