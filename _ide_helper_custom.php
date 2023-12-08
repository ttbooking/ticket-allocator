<?php

namespace Illuminate\Contracts\Foundation
{
    class Application
    {
        public function factorsAreCached(): bool
        {
            return true;
        }

        public function matchersAreCached(): bool
        {
            return true;
        }

        public function getCachedFactorsPath(): string
        {
            return '';
        }

        public function getCachedMatchersPath(): string
        {
            return '';
        }
    }
}

namespace Illuminate\Foundation
{
    class Application
    {
        public function factorsAreCached(): bool
        {
            return true;
        }

        public function matchersAreCached(): bool
        {
            return true;
        }

        public function getCachedFactorsPath(): string
        {
            return '';
        }

        public function getCachedMatchersPath(): string
        {
            return '';
        }
    }
}
