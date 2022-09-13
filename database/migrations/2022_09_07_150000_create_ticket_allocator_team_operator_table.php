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
        Schema::create('ticket_allocator_team_operator', function (Blueprint $table) {

            $table->foreignUuid('team_uuid')->constrained()->cascadeOnDelete();
            $table->foreignUuid('operator_uuid')->constrained()->cascadeOnDelete();

            $table->primary(['team_uuid', 'operator_uuid']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_allocator_team_operator');
    }
};
