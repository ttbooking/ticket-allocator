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
        Schema::create('ticket_allocator_matches', function (Blueprint $table) {
            $table->foreignUuid('ticket_uuid')->constrained('ticket_allocator_tickets', 'uuid')->cascadeOnDelete();
            $table->foreignUuid('operator_uuid')->constrained('ticket_allocator_operators', 'uuid')->cascadeOnDelete();
            $table->integer('initial_weight')->default(0);
            $table->integer('weight_increment')->default(0);
            $table->integer('complexity')->default(0);
            $table->integer('delay')->default(0);
            $table->integer('reservation')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();

            $table->primary(['ticket_uuid', 'operator_uuid']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_allocator_matches');
    }
};
