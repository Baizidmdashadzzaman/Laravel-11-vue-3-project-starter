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
        Schema::create('aztokens', function (Blueprint $table) {
            $table->id();
            $table->longText('aztoken')->nullable();
            $table->string('aztoken_key')->nullable();
            $table->bigInteger('token_request')->default(0);
            $table->longText('aztoken_information')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aztokens');
    }
};
