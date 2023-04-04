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
        Schema::create('ticket_allocator_ticket_categories', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->string('name');
            $table->string('short', 32);
            $table->unsignedInteger('initial_weight')->default(0);
            $table->unsignedInteger('weight_increment')->default(0);
            $table->unsignedInteger('complexity')->default(0);
            $table->unsignedInteger('delay')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_allocator_ticket_categories');
    }
};
