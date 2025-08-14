import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

export const supabaseProvider = {
    provide: 'SUPABASE_ADMIN_CLIENT',
    useFactory: (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseServiceRoleKey = configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !supabaseServiceRoleKey) {
            throw new Error('Supabase URL or Anon Key is not defined in environment variables.');
        }

        return createClient(supabaseUrl, supabaseServiceRoleKey, {
            db: { schema: 'todo_list' },
        });
    },
    inject: [ConfigService],
};