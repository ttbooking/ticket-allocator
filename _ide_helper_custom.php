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

    class Vite
    {
        /**
         * @param  array{component: string}  $page
         * @return $this
         */
        public function ticketAllocatorEntryPoint(array $page): static
        {
            return $this;
        }

        public function ticketAllocatorImage(string $asset): string
        {
            return '';
        }
    }
}
