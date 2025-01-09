<?php

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Models\Bank;
use Illuminate\Http\Request;

class BankController extends Controller
{
    public  $pageSize = 20;

    public function index(Request $request)
    {
        if($request->get('per_page')) {
            $this->pageSize = $request->get('per_page');
        }
        $banks = Bank::orderBy('id', 'asc')->paginate($this->pageSize);
        return $banks;
    }
}
