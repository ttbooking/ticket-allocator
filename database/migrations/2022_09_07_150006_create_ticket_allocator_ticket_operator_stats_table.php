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
        Schema::create('ticket_allocator_ticket_operator_stats', function (Blueprint $table) {

            // PK
            $table->uuid('ticket_uuid')->index();
            $table->uuid('operator_uuid')->index();

            // inherited properties
            $table->json('ticket_meta')->nullable();
            $table->unsignedInteger('post_count');
            $table->timestamp('last_bound');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_allocator_ticket_operator_stats');
    }
};
