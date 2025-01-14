<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessBankItem;
use Illuminate\Http\Request;
use App\Models\Bank;

class BankController extends Controller
{
    public function index()
    {
        $banks = Bank::all();
        return $banks;
    }

    public function banksWithCredits()
    {
        $banks = Bank::whereHas('credits')->with('credits')->get();
        return $banks;
    }
    public function storeOrUpdate(Request $request)
    {

        $data = $request->get('data');
        foreach ($data as $bank) {
            $bank = Bank::updateOrCreate([
                'name' => $bank['name'],
            ], [
                'link' => $bank['link'],
                'register_number' => isset($bank['register_number']) ? $bank['register_number'] : null,
                'register_number_link' => isset($bank['register_number_link']) ? $bank['register_number_link'] : null,
                'head_office' => isset($bank['head_office']) ? $bank['head_office'] : null,
                'phones' => isset($bank['phones']) ? $bank['phones'] : null,
                'logo_link' => isset($bank['logo_link']) ? $bank['logo_link'] : null,
                'website' => isset($bank['website']) ? $bank['website'] : null,
            ]);
            dispatch(new ProcessBankItem($bank));
        }


        return response()->json(['message' => 'Success'],200);
    }
    public function storeItem(Request $request)
    {
        $data = $request->get('data');
        $bank_id = $request->get('bank_id');
        $bank = Bank::findOrFail($bank_id);
        $bank->update($data);
        return ['message' => 'Success'];
    }
}
