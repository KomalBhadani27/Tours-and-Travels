CREATE OR REPLACE PACKAGE BODY app_user_security AS

  FUNCTION get_hash (p_username  IN  VARCHAR2,
                     p_password  IN  VARCHAR2)
    RETURN VARCHAR2 AS
    l_salt VARCHAR2(30) := 'goAdmin';
  BEGIN
    -- Pre Oracle 10g
    --RETURN DBMS_OBFUSCATION_TOOLKIT.MD5(
    --  input_string => UPPER(p_username) || l_salt || UPPER(p_password));

    -- Oracle 10g+ : Requires EXECUTE on DBMS_CRYPTO
    RETURN DBMS_CRYPTO.HASH(UTL_RAW.CAST_TO_RAW(UPPER(p_username) || l_salt || UPPER(p_password)),DBMS_CRYPTO.HASH_SH1);
  END;

  PROCEDURE add_user (p_username  IN  VARCHAR2,
                      p_password  IN  VARCHAR2) AS
  BEGIN
    INSERT INTO admin 
    VALUES (
      UPPER(p_username),
      get_hash(p_username, p_password)
    );
    
    COMMIT;
  END;
   
  PROCEDURE change_password (p_username      IN  VARCHAR2,
                             p_new_password  IN  VARCHAR2) AS
    v_rowid  ROWID;
  BEGIN
    UPDATE admin
    SET    password = get_hash(p_username, p_new_password)
    WHERE  admin_name = UPPER(p_username);
    
    
    COMMIT;
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE_APPLICATION_ERROR(-20000, 'Invalid username/password.');
  END;

  PROCEDURE valid_user (p_username  IN  VARCHAR2,
                        p_password  IN  VARCHAR2) AS
    v_dummy  VARCHAR2(1);
  BEGIN
    SELECT '1'
    INTO   v_dummy
    FROM   admin
    WHERE  admin_name = UPPER(p_username)
    AND    password = get_hash(p_username, p_password);
  EXCEPTION
    WHEN NO_DATA_FOUND THEN
      RAISE_APPLICATION_ERROR(-20000, 'Invalid username/password.');
  END;
  
  FUNCTION valid_user (p_username  IN  VARCHAR2,
                       p_password  IN  VARCHAR2) 
  RETURN BOOLEAN AS
  BEGIN
    valid_user(p_username, p_password);
    RETURN TRUE;
  EXCEPTION
    WHEN OTHERS THEN
      RETURN FALSE;
  END;
END;
/


