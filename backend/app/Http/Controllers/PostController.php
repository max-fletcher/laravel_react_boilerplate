<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(){

        $posts = Post::with('comments', 'category')->get();

        return response()->json([
            'status' => 'success',
            'posts'  => $posts,
        ]);
    }

    public function store(Request $request){

        $request->validate([
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string', 'max:65500'],
            'category_id'   => ['required', 'numeric', 'integer', 'exists:categories,id'],
        ]);

        Post::create($request->only('category_id', 'title', 'description'));

        return response()->json([
            'status'    => 'success',
            'message'   => 'Post created successfully!',
        ]);
    }

    public function show(int $post_id){

        $post = Post::find($post_id);

        if(!$post){
            return response()->json([
                'status' => 'failed',
                'message' => 'Post not found!'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'post'   => $post,
        ]);
    }

    public function update(Request $request, int $post_id){

        $request->validate([
            'title'         => ['required', 'string', 'max:255'],
            'description'   => ['required', 'string', 'max:65500'],
            'category_id'   => ['required', 'numeric', 'integer', 'exists:categories,id'],
        ]);

        $post = Post::find($post_id);

        if(!$post){
            return response()->json([
                'status' => 'failed',
                'message' => 'Post not found!'
            ], 404);
        }

        $post->update($request->only('category_id', 'title', 'description'));

        return response()->json([
            'status'    => 'success',
            'message'   => 'Post updated successfully!',
        ]);
    }

    public function delete(int $post_id){

        $post = Post::find($post_id);

        if(!$post){
            return response()->json([
                'status' => 'failed',
                'message' => 'Post not found!',
            ], 404);
        }

        $post->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Post deleted successfully!',
        ]);
    }
}
