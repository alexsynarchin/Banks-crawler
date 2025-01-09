<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{

    use HasFactory;
    protected $fillable = [
        'bank_id', 'name', 'sum', 'term', 'review_time', 'age', 'income', 'bid', 'psk'
    ];

    public function bank()
    {
        return $this->belongsTo(Bank::class, 'bank_id');
    }
}
