def is_valid_datetime(date_str: str, date_format: str):
    '''检查 时间字符串 是否符合格式(format)'''
    try:
        from datetime import datetime
        value = datetime.strptime(date_str, date_format)

        return True, value
    except ValueError as e:
        return False, None
