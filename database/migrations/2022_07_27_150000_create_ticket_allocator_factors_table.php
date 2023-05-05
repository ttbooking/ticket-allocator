<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ticket_allocator_factors', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->increments('priority')->index();
            $table->string('type')->index();
            $table->string('name')->nullable()->unique();
            $table->text('description')->nullable();
            $table->json('config')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_allocator_factors');
    }
};
