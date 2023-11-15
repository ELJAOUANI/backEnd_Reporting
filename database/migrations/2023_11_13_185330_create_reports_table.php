<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->string('serie_number');
            $table->string('operation');
            $table->string('type_of_operation');
            $table->string('address');
            $table->foreignId('city_id')->constrained('cities')->onDelete('cascade')->onUpdate('cascade');
            $table->string('secteur');
            $table->foreignId('technicien_id')->constrained('techniciens')->onDelete('cascade')->onUpdate('cascade');
            $table->string('date_of_operation');
            $table->string('sr')->nullable();
            $table->string('order_number')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
}
