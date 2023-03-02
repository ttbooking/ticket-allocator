<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('ticket_allocator_operators', function (Blueprint $table) {
            // PK
            $table->uuid()->primary();

            // inherited properties
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('name')->nullable();
            $table->boolean('online')->default(false);
            $table->boolean('ready')->default(false);
            $table->unsignedInteger('ticket_limit')->nullable();
            $table->unsignedInteger('complexity_limit')->nullable();
            $table->json('matching')->nullable();

            // calculated properties
            $table->unsignedInteger('bound_tickets')->default(0);
            $table->unsignedInteger('total_complexity')->default(0);

            // virtual fields
            $table->unsignedInteger('free_slots')->virtualAs('GREATEST(ticket_limit, bound_tickets) - bound_tickets');
            $table->unsignedInteger('free_complexity')->virtualAs('GREATEST(complexity_limit, total_complexity) - total_complexity');

            // timestamps
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();

            $table->rawIndex(
                '(CAST(matching->"$.categories" AS CHAR(36) ARRAY))',
                'ticket_allocator_operators_matching_categories_index'
            );
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_allocator_operators');
    }
};
