<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bank;

class BankController extends Controller
{
    public function index()
    {
        $banks = Bank::all();
        return $banks;
    }
    public function storeOrUpdate(Request $request)
    {

        $data = $request->get('data');
        foreach ($data as $bank) {
            Bank::updateOrCreate([
                'name' => $bank['name'],
            ], [
                'link' => $bank['link'],
                'register_number' => isset($bank['register_number']) ? $bank['register_number'] : null,
                'register_number_link' => isset($bank['register_number_link']) ? $bank['register_number_link'] : null,
                'head_office' => isset($bank['head_office']) ? $bank['head_office'] : null,
                'phones' => isset($bank['phones']) ? $bank['phones'] : null,
                'website' => isset($bank['website']) ? $bank['website'] : null,
            ]);
        }


        return response()->json(['message' => 'Success'],200);
    }
}
