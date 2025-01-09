<?php

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Models\Credit;
use Illuminate\Http\Request;

class CreditController extends Controller
{
    public  $pageSize = 20;

    public function index(Request $request)
    {
        if($request->get('per_page')) {
            $this->pageSize = $request->get('per_page');
        }

        $credits = Credit::with('bank')
        ->orderBy('id','asc')->paginate($this->pageSize);

        return $credits;
    }
}
