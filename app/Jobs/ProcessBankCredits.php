<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Process;
class ProcessBankCredits implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */

    protected $bank;
    public function __construct($bank)
    {
        $this->bank = $bank;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        $link = $this -> bank->link . 'kredity/';
        //$result = Process::run('cd /var/www/banki-scrawler/crawler && node bank-credits.js bank_id='.$this->bank->id . ' link='. $link . ' &');
        //echo $result->errorOutput();
        $output = shell_exec('cd /var/www/banki-scrawler/crawler && node bank-credits.js bank_id='.$this->bank->id . ' link='. $link . ' &');
        echo $output;
    }
}
