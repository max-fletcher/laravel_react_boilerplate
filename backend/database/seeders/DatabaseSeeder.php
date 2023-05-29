<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        for($i=1; $i<=5; $i++){
            DB::table('categories')->insert([
                'category_name' => fake()->text(10),
            ]);
        }

        $categories = DB::table('categories')->get();

        for($i=1; $i<=100; $i++){

            $category = $categories->random();

            DB::table('posts')->insert([
                'category_id'   => $category->id,
                'title'         => fake()->text(15),
                'description'   => fake()->text(30),
            ]);
        }

        $posts = DB::table('posts')->get();

        foreach($posts as $post){
            $max = rand(1, 5);
            for($i=1; $i<=$max; $i++){
                DB::table('comments')->insert([
                    'post_id'       => $post->id,
                    'comment'       => fake()->text(30),
                ]);
            }
        }
    }
}
