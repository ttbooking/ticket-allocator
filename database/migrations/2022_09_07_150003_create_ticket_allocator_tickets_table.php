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
        Schema::create('ticket_allocator_tickets', function (Blueprint $table) {
            // PK
            $table->uuid()->primary();

            // FK
            $table->foreignUuid('category_uuid')->constrained('ticket_allocator_ticket_categories', 'uuid');
            $table->foreignUuid('handler_uuid')->nullable()->constrained('ticket_allocator_operators', 'uuid')->nullOnDelete();

            // inherited properties
            $table->json('meta')->nullable();
            $table->json('metrics')->nullable();

            // calculated properties
            $table->unsignedInteger('initial_weight')->default(0);
            $table->unsignedInteger('weight_increment')->default(0);
            $table->unsignedInteger('complexity')->default(0);
            $table->unsignedInteger('delay')->default(0);
            $table->unsignedInteger('reservation')->default(0);

            // virtual fields
            //$table->unsignedInteger('weight')->virtualAs('initial_weight + TIMESTAMPDIFF(SECOND, created_at, NOW()) * weight_increment')->index();
            $table->timestamp('delayed_until')->virtualAs('DATE_ADD(created_at, INTERVAL delay SECOND)');
            $table->timestamp('reserved_until')->virtualAs('DATE_ADD(bound_at, INTERVAL reservation SECOND)');

            // timestamps
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->timestamp('bound_at')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->softDeletes();

            $table->rawIndex('(CAST(meta->"$.order" AS UNSIGNED))', 'ticket_allocator_tickets_meta_order_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_allocator_tickets');
    }
};
