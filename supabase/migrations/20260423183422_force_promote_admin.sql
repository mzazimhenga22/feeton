-- Force update user to admin
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'waitathuderrick@gmail.com';

-- Verify
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM profiles WHERE email = 'waitathuderrick@gmail.com' AND is_admin = true) THEN
    RAISE NOTICE 'User waitathuderrick@gmail.com is now an ADMIN';
  ELSE
    RAISE WARNING 'Promotion failed or user not found';
  END IF;
END $$;
