<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\ProcessBankCredits;
use App\Jobs\ProcessBanks;
use App\Models\Bank;
use App\Services\ShellCommand;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Process;

class CrawlerController extends Controller
{
    public function crawlingBanks()
    {
        if(DB::table('jobs')->count() > 0) {
            return [
                'message' => 'В данный момент идет парсинг',
                'type' => 'warning'
            ];
        }
        dispatch(new ProcessBanks());
        return [
            'message ' => 'Парсинг банков со sravni.ru запущен',
            'type' => 'success'
        ];
    }
    public function crawlingCredits()
    {

        if(DB::table('jobs')->count() > 0) {
            return [
                'message' => 'В данный момент идет парсинг',
                'type' => 'warning'
            ];
        }

        $banks = Bank::all();

        foreach ($banks as $bank) {
            dispatch(new ProcessBankCredits($bank));
        }

         return [
            'message ' => 'Парсинг кредитов со sravni.ru запущен',
            'type' => 'success'
    ];
    }
}
