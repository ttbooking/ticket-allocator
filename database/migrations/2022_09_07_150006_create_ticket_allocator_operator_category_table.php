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
        Schema::create('ticket_allocator_operator_category', function (Blueprint $table) {
            $table->foreignUuid('operator_uuid')->constrained('ticket_allocator_operators', 'uuid')->cascadeOnDelete();
            $table->foreignUuid('category_uuid')->constrained('ticket_allocator_ticket_categories', 'uuid')->cascadeOnDelete();
            $table->unsignedTinyInteger('team_count')->default(0);

            $table->primary(['operator_uuid', 'category_uuid']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_allocator_operator_category');
    }
};
