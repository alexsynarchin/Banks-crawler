<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bank;
class CreditController extends Controller
{
    public function storeOrUpdate(Request $request)
    {
        $data = $request->get('data');
        $bank_id = $request->get('bank_id');
        $bank = Bank::findOrFail($bank_id);
        foreach ($data as $credit) {


            $bank->credits()->updateOrCreate([
                'name' => $credit['name'],
            ],[
                'sum' => $credit['sum'],
                'term' => $credit['term'],
                'review_time' => $credit['review_time'],
                'age' => $credit['age'] ?? '',
                'income' => $credit['income'] ?? '',
                'psk' => $credit['psk'] ?? '',
                'bid' => $credit['bid'] ?? ''
            ]);
        }
        return response()->json(['message' => 'Success'],200);
    }
}
