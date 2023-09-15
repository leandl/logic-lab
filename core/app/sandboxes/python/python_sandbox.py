import sys
import resource
import pyseccomp as seccomp
import json


MEMORY_LIMIT = 64 * 1024 * 1024  # 64kb
CPU_TIME_LIMIT = 1  # 1sec
WRITE_LIMIT = 512  # 512bytes


def drop_perms():
    # respond with EPERM: operation not permitted so users can tell
    # they're being blocked from doing something
    _filter = seccomp.SyscallFilter(seccomp.ERRNO(seccomp.errno.EPERM))

    # allow `write`ing to two already-opened files stdout and stderr
    _filter.add_rule(
        seccomp.ALLOW, "write", seccomp.Arg(0, seccomp.EQ, sys.stdout.fileno())
    )
    _filter.add_rule(
        seccomp.ALLOW, "write", seccomp.Arg(0, seccomp.EQ, sys.stderr.fileno())
    )

    # load the filter in the kernel
    _filter.load()


def set_mem_limit():
    # virtual memory
    resource.setrlimit(resource.RLIMIT_AS, (MEMORY_LIMIT, MEMORY_LIMIT))
    # cpu time
    resource.setrlimit(resource.RLIMIT_CPU, (CPU_TIME_LIMIT, CPU_TIME_LIMIT))
    # write limit i.e. don't allow an infinite stream to stdout/stderr
    resource.setrlimit(resource.RLIMIT_FSIZE, (WRITE_LIMIT, WRITE_LIMIT))


if __name__ == "__main__":
    name_question = sys.argv[1]
    code = sys.argv[2]
    tests_in_json = sys.argv[3]
    tests = json.loads(tests_in_json)
    
   
    set_mem_limit()
    drop_perms()
    exec(code)

    func = globals()[name_question]
    data_tests = []
    for test in tests:
        test_args = test.get('args')
        result = func(*test_args)
        expected_result = test.get('result')

        data_tests.append({
            'args': test_args,
            'expected_result': expected_result,
            'result': result,
            'passed': result == expected_result
        })

    print(json.dumps(data_tests))
