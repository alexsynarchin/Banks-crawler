<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'link',
        'register_number',
        'register_number_link',
        'head_office',
        'logo_link',
        'phones',
        'website',
    ];
    public function credits(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Credit::class, 'bank_id');
    }
}
